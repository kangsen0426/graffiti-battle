

export const initScrollCenter = function () {
    document.documentElement.scrollTop =
        (document.body.scrollHeight - document.body.offsetHeight) / 2;
    document.documentElement.scrollLeft =
        (document.body.scrollWidth - document.body.offsetWidth) / 2;
}