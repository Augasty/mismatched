<script>
    import {createGrid} from './emoji'
    const statetype = ['start','playing','paused','won','lost']

    let state = statetype[0]
    let size = 20
    let grid = createGrid(size)


    console.log(grid)
</script>
