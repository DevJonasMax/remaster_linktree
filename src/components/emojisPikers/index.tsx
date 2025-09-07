import EmojiPicker from "emoji-picker-react";

export default function EmojisPikers({
    setEmoji,
}: {
    setEmoji: (emoji: string) => void;
}) {
    return (
        <div className="w-full">
            <EmojiPicker
                width={"100%"}
                skinTonesDisabled={true}
                onEmojiClick={(emojiObject) => {
                    setEmoji(emojiObject.emoji);
                }}
            />
        </div>
    );
}
