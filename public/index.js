let currentPrice;
async function updatePrice(){
    const res = await fetch('/api')
    const data = await res.json();
    document.getElementById('price-display').textContent = data.price;
    currentPrice = data.price;
}

updatePrice();
setInterval(updatePrice, 60 * 1000);

const investBtn = document.getElementById('invest-btn');
const investmentInput = document.getElementById('investment-amount');
const dialogEl = document.querySelector('dialog');
const messageEl = document.getElementById('investment-summary');
const dialogBtn = document.getElementById('dialog-btn');

dialogBtn.addEventListener('click', () => {
    investmentInput.value = 100;
    dialogEl.close();
})

investBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const investAmount = investmentInput.value;
    messageEl.textContent = `You just bought ${(investAmount / currentPrice).toFixed(3)} ounces (ozt) for $${investAmount}. \n You will receive documentation shortly`;
    const date = new Date();
    const formData = {
        time: date.toLocaleString(),
        'amount paid': `$${investAmount}`,
        'price per oz': `$${currentPrice}`,
        'gold sold': `${(investAmount / currentPrice).toFixed(3)} Oz`
    }
    
    try{
        const response = await fetch("./api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
    } catch(err){
        console.error(err);
    }
    
    dialogEl.showModal();
})
