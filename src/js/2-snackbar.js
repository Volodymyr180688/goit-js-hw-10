import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector('.form');
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const delay = parseInt(this.elements.delay.value);
    const state = this.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else {
            setTimeout(() => {
                reject(delay);
            }, delay);
        }
    });

    promise.then((result) => {
        iziToast.success({
            title: 'Fulfilled promise',
            message: `✅ Fulfilled promise in ${result}ms`
        });
    }).catch((error) => {
        iziToast.error({
            title: 'Rejected promise',
            message: `❌ Rejected promise in ${error}ms`
        });
    });

    this.reset();
});