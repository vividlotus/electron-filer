const { shell } = require('electron');
const path = require('path');
const Filer = require(path.resolve('src') + '/filer');
const Util = require(path.resolve('src') + '/util');

window.jQuery = window.$ = require(path.resolve('src') + '/vendor/jquery-3.4.1.min.js');

$(document).ready(() => {
    let current = new Filer();
    let currentPos = 0;
    let histories = [];
    let $dEntries = $('#entries');
    let isProcessing = false;

    $(document).on('mousedown', (e) => {
        if (isProcessing) return;

        switch (e.which)
        {
            // 戻る
            case 4:
                if (histories.length > 0 && histories[currentPos - 1] !== undefined)
                {
                    back(histories[currentPos - 1]);
                }
                break;
            // 進む
            case 5:
                if (histories.length > 0 && histories[currentPos + 1] !== undefined)
                {
                    foward(histories[currentPos + 1], false);
                }
                break;
        }
    });

    function foward(filepath, isAddHistory = true)
    {
        isProcessing = true;
        let filer = new Filer(filepath);
        filer.ls()
            .then((entries) => {
                if (isAddHistory)
                {
                    if (currentPos < histories.length - 1)
                    {
                        let i = (histories.length - 1) - currentPos;
                        while (i > 0)
                        {
                            histories.pop();
                            i--;
                        }
                    }
                    histories.push(filer.pwd());
                }
                current = filer;
                currentPos++;
                render(entries);
            })
            .catch(e => {
                alert(e);
            });
    }

    function back(filepath)
    {
        isProcessing = true;
        let filer = new Filer(filepath);
        filer.ls()
            .then((entries) => {
                current = filer;
                currentPos--;
                render(entries);
            })
            .catch(e => {
                alert(e);
            });
    }

    function render(entries)
    {
        $dEntries.empty();

        for (let i = 0; i < entries.length; i++)
        {
            let entry = entries[i];
            let size = entry.size;
            if (entry.isDrive())
            {
                size = `${Util.size(entry.rawSize, false)} / ${entry.totalSize} (${entry.freeSize})`;
            }

            let $dLink = $('<div/>')
                .attr({
                    'path': entry.filepath,
                    'type': entry.type,
                 })
                .text(entry.name)
                .css({ color: "blue" })
                .on('dblclick', e => {
                    e.preventDefault();

                    let $elem = $(e.currentTarget);
                    let type = $elem.attr('type');

                    if (type == 'DRIVE' || type == 'SYMBOLIC_LINK' || type == 'DIRECTORY')
                    {
                        foward($elem.attr('path'));
                    }
                    else
                    {
                        shell.openItem($elem.attr('path'));
                    }

                    return false;
                });

            let $dSize = $('<div/>')
                .addClass('size')
                .text(`size: ${size}`);

            $dEntries.append($('<div/>').append($dLink).append($dSize));

            isProcessing = false;
        }
    }

    // init
    isProcessing = true;
    current.ls()
        .then((entries) => {
            histories.push(current.pwd());
            render(entries);
        })
        .catch(e => {
            alert(e);
        });
});
