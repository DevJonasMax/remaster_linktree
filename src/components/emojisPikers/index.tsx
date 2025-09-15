import EmojiPicker, { Categories, EmojiClickData } from "emoji-picker-react";

export default function EmojisPikers({
    setEmoji,
}: {
    setEmoji: (emoji: EmojiClickData) => void;
}) {
    const categoriasPtBr = [
        { category: Categories.SMILEYS_PEOPLE, name: "Carinhas" },
        { category: Categories.ANIMALS_NATURE, name: "Animais & Natureza" },
        { category: Categories.FOOD_DRINK, name: "Comida & Bebida" },
        { category: Categories.TRAVEL_PLACES, name: "Viagem & Lugares" },
        { category: Categories.ACTIVITIES, name: "Atividades" },
        { category: Categories.OBJECTS, name: "Objetos" },
        { category: Categories.SYMBOLS, name: "Símbolos" },
        { category: Categories.FLAGS, name: "Bandeiras" },
    ];

    return (
        <div className="w-full">
            <EmojiPicker
                width={"100%"}
                skinTonesDisabled={true}
                onEmojiClick={(emojiObject: EmojiClickData) => {
                    setEmoji(emojiObject);
                }}
                categories={categoriasPtBr}
            />
        </div>
    );
}
