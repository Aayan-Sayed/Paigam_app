import supabase from "../supabase";

const GroupMessage = async ({
  group_id,
  sender_id,
  message,
  sender_lang,
}: {
  group_id: string;
  sender_id: string;
  message: string;
  sender_lang: string;
}) => {
  const { error } = await supabase.from("group_chats").insert({
    group_id,
    sender_id,
    message,
    sender_lang,
  });
  console.log(
    `Group message sent from ${sender_id} in group ${group_id}: "${message}" in ${sender_lang}`
  );
  if (error) {
    console.log(error);
  }
};

export default GroupMessage;
