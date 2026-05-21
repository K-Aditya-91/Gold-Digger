export function getLivePrice(){
    const basePrice = 5250;

    const random1 = Math.random();
    const random2 = Math.round(Math.random() * 10);

    if(random1 < 0.5){
        return basePrice - random2;
    } 
    return basePrice + random2;
}