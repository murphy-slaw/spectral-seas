BlockEvents.rightClicked('minecraft:obsidian', e => {
    doPortal(e)
})

BlockEvents.rightClicked('minecraft:crying_obsidian', e => {
    doPortal(e)
})


function doPortal(e) {
    if (e.item == "minecraft:flint_and_steel") {
        e.cancel();
    }
    if (e.item == 'minecraft:apple') {
        //e.player.tell('<try to making portal..>')
        let valid_blocks = {
            "minecraft:obsidian": true,
            "minecraft:crying_obsidian": true,
        }


        let x = e.block.x
        let y = e.block.y
        let z = e.block.z
        let dir = 0
        var fx, fy, fz
        var sx, sy, sz

        var frame_blocks = {}

        let testBlockAt = function(pos) {
            let cur_block = e.level.getBlock(pos)
            if (valid_blocks[cur_block]){
                frame_blocks[cur_block] = true
                return true
            }
            return false
        };

        //X+
        //e.player.tell('X+ start')
        for (; dir == 0;) {
            if (testBlockAt([x + 1, y + 1, z])){
                dir++;x++;y++
                //e.player.tell('first corner')
                fx = x - 1
                fy = y

                //Y+
                //e.player.tell('Y+ start')
                for (; dir == 1;) {
                    if (testBlockAt([x - 1, y + 1, z])) {
                        dir++; x--; y++

                        //X- start
                        for (; dir == 2;) {
                            if (testBlockAt([x - 1, y - 1, z])){
                                dir++; x--; y--
                                sx = x + 1
                                sy = y

                                //Y- start
                                for (; dir == 3;) {
                                    if (testBlockAt([x + 1, y - 1, z])) {
                                        dir++; x++; y--
                                        //e.player.tell('last corner')
                                        //last x+
                                        //e.player.tell('last X+ start')
                                        for (; dir == 4;) {
                                            if (x == e.block.x && y == e.block.y) {
                                                //e.player.tell('is portal!')
                                                if ((Math.abs(fx - sx) > 0) && (Math.abs(fy - sy) > 1)) {
                                                    //e.player.tell('enough')
                                                    let clearPortal = true
                                                    for (let i = 0, j = 0; (i <= Math.abs(fx - sx)) || (j <= Math.abs(fy - sy));) {
                                                        if (e.level.getBlock(sx + i, fy + j, z) == 'minecraft:air') {
                                                            //e.player.tell(`${i}, ${j} is air`)
                                                            i++
                                                        } else if (valid_blocks[e.level.getBlock(sx + i, fy + j, z)]) {
                                                            //e.player.tell(`${i}, ${j} is obsidian`)
                                                            i = 0
                                                            j++
                                                        } else {
                                                            //e.player.tell('strange thing in portal!')
                                                            clearPortal = false
                                                            break
                                                        }
                                                    }
                                                    if (clearPortal && frame_blocks["minecraft:crying_obsidian"]) {
                                                        e.server.runCommandSilent(`fill ${fx} ${fy} ${z} ${sx} ${sy} ${z} nether_portal`)
                                                    }
                                                    dir = 5
                                                    return false
                                                } else {
                                                    //e.player.tell('too small')
                                                    dir = 5
                                                    break
                                                }

                                            } else if (testBlockAt([x + 1, y, z])) {
                                                x++
                                                //e.player.tell('x++ continued')
                                            } else {
                                                //e.player.tell('portal failed')
                                                dir = 5
                                                break
                                            }
                                        }
                                    } else if (testBlockAt([x, y - 1, z])) {
                                        y--
                                        //e.player.tell('y- continued')
                                    } else {
                                        //e.player.tell('portal failed')
                                        dir = 5
                                        break
                                    }
                                }
                            } else if (testBlockAt([x - 1, y, z])) {
                                x--
                                //e.player.tell('x- continued')
                            } else {
                                //e.player.tell('portal failed')
                                dir = 5
                                break
                            }
                        }
                    } else if (testBlockAt([x, y + 1, z])) {
                        y++
                        //e.player.tell('y+ continued')
                    } else {
                        //e.player.tell('portal failed')
                        dir = 5
                        break
                    }
                }

            } else if (testBlockAt([x + 1, y, z])) {
                x++
                //e.player.tell('x+ continued')
            } else {
                //e.player.tell('portal failed')
                dir = 5
                break
            }

        }

        x = e.block.x
        y = e.block.y
        z = e.block.z

        //z+
        //e.player.tell('Z+ start')
        for (; dir == 5;) {
            if (testBlockAt([x, y + 1, z + 1])) {
                dir++; z++; y++
                //e.player.tell('first corner')
                fz = z - 1
                fy = y

                //Y+
                //e.player.tell('Y+ start')
                for (; dir == 6;) {
                    if (testBlockAt([x, y + 1, z - 1])) {
                        dir++; z--; y++
                        //e.player.tell('sec corner')

                        //Z- start
                        //e.player.tell('Z- start')
                        for (; dir == 7;) {
                            if (testBlockAt([x, y - 1, z - 1])) {
                                dir++; z--; y--
                                //e.player.tell('3rd corner')
                                sz = z + 1
                                sy = y
                                //Y-
                                //e.player.tell('Y- start')
                                for (; dir == 8;) {
                                    if (testBlockAt([x, y - 1, z + 1])) {
                                        dir++; z++; y--
                                        //e.player.tell('last corner')
                                        //last z+
                                        //e.player.tell('last z+ start')
                                        for (; dir == 9;) {
                                            if (z == e.block.z && y == e.block.y) {
                                                //e.player.tell('is portal!')
                                                if ((Math.abs(fz - sz) > 0) && (Math.abs(fy - sy) > 1)) {
                                                    //e.player.tell('enough')
                                                    let clearPortal = true
                                                    for (let i = 0, j = 0; (i <= Math.abs(fz - sz)) || (j <= Math.abs(fy - sy));) {
                                                        if (e.level.getBlock(x, fy + j, sz + i) == 'minecraft:air') {
                                                            //e.player.tell(`${i}, ${j} is air`)
                                                            i++
                                                        } else if (valid_blocks[e.level.getBlock(x, fy + j, sz + i)]) {
                                                            //e.player.tell(`${i}, ${j} is obsidian`)
                                                            i = 0
                                                            j++
                                                        } else {
                                                            //e.player.tell('strange thing in portal!')
                                                            clearPortal = false
                                                            break
                                                        }
                                                    }
                                                    if (clearPortal && frame_blocks["minecraft:crying_obsidian"]) {
                                                        e.server.runCommandSilent(`fill ${x} ${fy} ${fz} ${x} ${sy} ${sz} nether_portal[axis=z]`)
                                                    }
                                                    dir = 10
                                                    return false
                                                } else {
                                                    //e.player.tell('too small')
                                                    dir = 10
                                                    break
                                                }

                                            } else if (testBlockAt([x, y, z + 1])) {
                                                z++
                                                //e.player.tell('z++ continued')
                                            } else {
                                                //e.player.tell('portal failed')
                                                dir = 10
                                                break
                                            }
                                        }
                                    } else if (testBlockAt([x, y - 1, z])) {
                                        y--
                                        //e.player.tell('y- continued')
                                    } else {
                                        //e.player.tell('portal failed')
                                        dir = 10
                                        break
                                    }
                                }
                            } else if (testBlockAt([x, y, z - 1])) {
                                z--
                                //e.player.tell('z- continued')
                            } else {
                                //e.player.tell('portal failed')
                                dir = 10
                                break
                            }
                        }
                    } else if (testBlockAt([x, y + 1, z])) {
                        y++
                        //e.player.tell('y+ continued')
                    } else {
                        //e.player.tell('portal failed')
                        dir = 10
                        break
                    }
                }

            } else if (testBlockAt([x, y, z + 1])) {
                z++
                //e.player.tell('z+ continued')
            } else {
                //e.player.tell('portal failed')
                dir = 10
                break
            }
        }
    }
}