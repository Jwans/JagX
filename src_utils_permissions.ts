export const isAdmin = async (msg: any) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();
  if (!chat.isGroup) return false;
  const participants = await chat.participants;
  const participant = participants.find((p: any) => p.id._serialized === contact.id._serialized);
  return participant && participant.isAdmin;
};