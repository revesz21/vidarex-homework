# Vidarex homework

Hi, this is my implementation of the frontend task for the 2nd round. I hope you will like it.

## 🌐 Live Demo

The project is live at: [reveszpeter.cloud](https://reveszpeter.cloud/)

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Task overview ✓

1. Készíts egy komponenst, ami megjelenít egy nagy felbontású képet (city.jpg) egy 768x432 méretű dobozba zsugorítva. A cursort a kép fölé húzva jelenjen meg egy 50px  sugarú kör, a cursortól 50px távolságra, benne a cursor középpontú, 50px  sugarú kör alatti területhez tartozó képrészlet alapértelmezetten kétszeres nagyításban (zoom funkció). A cursort a kép felett mozgatva a “nagyító” kövesse a cursor mozgását, ezáltal végig lehessen pásztázni a kép összes részletén. A komponens mellett jobbra függőlegesen legyen egy csúszka, amivel a zoomolás mértéke állítható 1-10x nagyítási mérték között, a komponens alatt pedig legyen egy másik csúszka, amivel a kinagyított kép szaturációját lehet beállítani 0-100% érték között. A billentyűzeten a jobbra balra nyilakkal lehessen a szaturációs értéket állítani, az egér görgőjével pedig a zoom mértékét. ✓

Extra tasks: 
1. A szaturációs csúszka helyett legyen 3 db csúszka külön minden szín csatornához (RGB), amivel a kép pixelértékeit lehet az adott csatornán 0 és 100% között állítani. Például ha a piros és a zöld csúszkát 0%-ra állítjuk, akkor csak kék szín jelenjen meg a képen (kékárnyalatos kép), amennyiben mind a 3 csuszka értéke 0%, abban az esetben pedig teljesen fekete képet kapjunk. Ez esetben a billentyűzeten a nyilak mellett egy “r” “g” és “b” gombot nyomva lehessen mozgatni a csúszkákat. ✓

2. A “nagyító” easinggel kövesse az egeret. ✓

3. A “nagyító” úgy kövesse az egeret, hogy az mindig a képen belül marad. ✓

## Thoughts

- In this repository, I've included the image, but in a real-world application I would utilize a cloud-based solution for storing and managing images to be as scalable and secure as possible.
- On a mouse, scrolling up zooms in, matching the natural expectation. However, on touchpads the opposite happens since the downward gesture moves the page up.
- I spent the most time with the 1st task from the extras, I had to introduce multiples canvases to achieve the desired functionality.
