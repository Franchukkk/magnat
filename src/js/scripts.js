let icon = {
    success: '<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="#20bf55" data-name="Flat Color"><path d="M12 22.75a10.75 10.75 0 0 1 0-21.5 10.53 10.53 0 0 1 4.82 1.15.75.75 0 0 1-.68 1.34 9 9 0 0 0-4.14-1A9.25 9.25 0 1 0 21.25 12a2 2 0 0 0 0-.25.75.75 0 1 1 1.5-.14V12A10.76 10.76 0 0 1 12 22.75z" fill="#045d22" opacity="1" data-original="#20bf55" class=""></path><path d="M11.82 15.41a.7.7 0 0 1-.52-.22l-4.83-4.74a.75.75 0 0 1 0-1.06.77.77 0 0 1 1.07 0l4.29 4.23 9.65-9.49a.77.77 0 0 1 1.07 0 .75.75 0 0 1 0 1.06l-10.18 10a.74.74 0 0 1-.55.22z" fill="#045d22" opacity="1" data-original="#20bf55" class=""></path></g></g></svg></span>',
    info: '<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 330 330" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M165 0C74.019 0 0 74.02 0 165.001 0 255.982 74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001C300 239.44 239.439 300 165 300z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M164.998 70c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991 11.026 0 19.996-8.968 19.996-19.991 0-11.033-8.97-20.009-19.996-20.009zM165 140c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></span>',
};

const showToast = (
    message = "Sample Message",
    toastType = "info",
    duration = 5000) => {
    if (!Object.keys(icon).includes(toastType)) toastType = "info";
    let box = document.createElement("div");
    box.classList.add(
        "toast", `toast-${toastType}`);
    box.innerHTML = ` <div class="toast-content-wrapper"> 
                      <div class="toast-icon"> 
                      ${icon[toastType]} 
                      </div> 
                      <div class="toast-message">${message}</div> 
                      <div class="toast-progress"></div> 
                      </div>`;
    duration = duration || 5000;
    box.querySelector(".toast-progress").style.animationDuration =
        `${duration / 1000}s`;

    let toastAlready =
        document.body.querySelector(".toast");
    if (toastAlready) {
        toastAlready.remove();
    }

    document.body.appendChild(box)

    document.body.querySelector(".toast").style.zIndex = "100"

    let toastTimeout = setTimeout(function () {
        document.body.querySelector(".toast").style.zIndex = "-10"
    }, 5000)
};

let submit =
    document.querySelector(".custom-toast.success-toast");
let information =
    document.querySelector(".custom-toast.info-toast");
let failed =
    document.querySelector(".custom-toast.danger-toast");
let warn =
    document.querySelector(".custom-toast.warning-toast");