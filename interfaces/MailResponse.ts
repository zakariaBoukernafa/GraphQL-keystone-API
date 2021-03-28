export interface Envelope {
  from: string;
  to: string[] | null;
}
export interface MailResponse {
  accepted: string[] | null;
  rejected: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
