export default body => fetch('/carrinho', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body
});