function formatImgUrl(base, format, size) {
    return `${base}${format ? `.${format}` : ""}${size ? `?size=${size}` : ""}`
}

module.exports = {
    formatImgUrl
}