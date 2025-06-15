import supabase from "../supabase";

const SendMessage = async (
  translated_message: string,
  {
    sender_id,
    receiver_id,
    message,
    language,
  }: {
    sender_id: string;
    receiver_id: string;
    message: string;
    language: string;
  }
) => {
  const { error } = await supabase.from("chats").insert({
    sender_id: sender_id,
    receiver_id: receiver_id,
    message: message,
    translated_message: translated_message,
    language: language,
    status: "sent",
    type: "test",
  });
  if (error) {
    console.log(error);
  }
};

export default SendMessage;
