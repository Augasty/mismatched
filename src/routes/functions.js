// @ts-nocheck
import { matches, selected } from "./store"

let selected_value;
let matched_values;

selected.subscribe((value) => {
  selected_value = value;
});
matches.subscribe((value) => {
  matched_values = value;
});


export const emoji = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '🥹',  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮‍💨', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢', '🤭', '🤫', '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🫥', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕']
// console.log(emoji.length,'ss')



// functions
export const createGrid =(/** @type {number} */ size)=>{
    let cards = new Set()
    let maxSize = size / 2

    while (cards.size < maxSize){
        const randomIdx = Math.floor(Math.random() * emoji.length)
        cards.add(emoji[randomIdx])
    }
    return shuffle([...cards,...cards])
}




function shuffle(items){
    return items.sort(()=>Math.random() - 0.5)
}


export function selectCard(idx) {
    selected.update((arr)=>[...arr,idx])
    console.log(selected_value)
  }

  export function matchCards( grid) {
    const [first, second] = selected_value;

    if (grid[first] === grid[second]) {
      matches.update((arr)=>[...arr,grid[first]])
    }
    setTimeout(()=>selected.update(()=>[]),300)
  }