export const emoji = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '🥹',  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮‍💨', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢', '🤭', '🤫', '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🫥', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕']
// console.log(emoji.length,'ss')

export const createGrid =(/** @type {number} */ size)=>{
    let cards = new Set()
    let maxSize = size / 2

    while (cards.size < maxSize){
        const randomIdx = Math.floor(Math.random() * emoji.length)
        cards.add(emoji[randomIdx])
    }
    return shuffle([...cards,...cards])
}

/**
 * @param {any[]} items
 */
function shuffle(items){
    return items.sort(()=>Math.random() - 0.5)
}