export default function getCard() {
    let card = localStorage.getItem("card");
    if (card == null) {
        let emptyCard = [];
        localStorage.setItem("card", JSON.stringify(emptyCard));
        return [];
    }
    card = JSON.parse(card);
    return card;
}

export function AddToCard(product, quantity) {
    let card = getCard();
    
    // Corrected this line
    const productIndex = card.findIndex((item) => item.productID === product.productID);

    if (productIndex === -1) {
        card.push({
            productID: product.productID,
            name: product.name,
            altNames: product.altNames,
            price: product.price,
            quantity: quantity,
        });
    } else {
        card[productIndex].quantity += quantity;

        if (card[productIndex].quantity <= 0) {
            card = card.filter((item) => item.productID !== product.productID);
        }
    }

    localStorage.setItem("card", JSON.stringify(card));
    return card;
}

export function removeCard(productID) {
    let card = getCard();
    card = card.filter((product) => product.productID !== productID);
    localStorage.setItem("card", JSON.stringify(card));
    return card;
}
