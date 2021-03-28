/* eslint-disable */
import {
    KeystoneContext,
    SessionStore
} from '@keystone-next/types';


import {
    CartItemCreateInput,
    OrderCreateInput
} from '../.keystone/schema-types';
import {
    Arguments
} from '../interfaces/Token';
import stripConfig from '../lib/stripe';
import {
    CartItem
} from '../schemas/CartItem';

const graphql = String.raw;
async function checkout(
    root: any, {
        token
    }: Arguments,
    context: KeystoneContext
): Promise < OrderCreateInput > {
    //check if signed in
    const userId = context.session.itemId;
    if (!userId) {
        throw new Error('Sorry! You must be signed in to create and order!');
    }

    //query the current user
    const user = await context.lists.User.findOne({
        where: {
            id: userId
        },
        resolveFields: graphql `
        id 
        name
        email
        cart{
            id
            quantity
            product{
                name
                price
                description
                id
                photo{
                    id
                    image{
                        id
                        publicUrlTransformed
                    }
                }
            }
        }`
    })

    // calculate the total price for the order
    const cartItems = user.cart.filter(cartItem => cartItem.product);
    const amount = cartItems.reduce(function (tally: number, cartItem: CartItemCreateInput) {
        return tally + cartItem.quantity * cartItem.product.price;
    }, 0)

    //create the payment with stripe
    const charge = await stripConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token,
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    });
    console.log(charge);

    //convert the cartItem to order items
    const orderItems = cartItems.map(cartItem =>{
        const orderItem = {
            name: cartItem.product.name,
            description:cartItem.product.description,
            price: cartItem.product.price,
            quantity:cartItem.quantity,
            photo: {connect:{id: cartItem.product.photo.id}},
            user:{connect:{id:userId}}
        }
        return orderItem;
    })
    // create the order and return it 
    const order=await context.lists.Order.createOne({
        data:{
            total:charge.amount,
            charge:charge.id,
            items:{create:orderItems},
            user:{connect:{id:userId}}
        }
    });
    //clean old cart items
    const cartItemIds = user.cart.map(cartItem=>cartItem.id);
    await context.lists.CartItem.deleteMany({
        ids:cartItemIds
    });
    return order;
}

export default checkout;