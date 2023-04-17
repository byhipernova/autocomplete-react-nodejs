const express = require('express')
const cors = require('cors')
const app = express()
const port = 4001;
app.use(cors())
class Trie {
    constructor() {
        this.tree = new Map();
    }

    addWord(word) {
        let node = this.tree;
        for (let char of word) {
            if (!node.get(char)) {
                node.set(char, new Map());
            }
            node = node.get(char);
        }
        node.set("word", word);
    }

    autocomplete(word) {
        let node = this.tree;
        for (let char of word) {
            if (!node.get(char)) {
                return [];
            }
            node = node.get(char);
        }
        return this._autocomplete(node, []);
    }

    _autocomplete(node, results) {
        if (node.get("word")) {
            results.push(node.get("word"));
        }
        for (let [char, subNode] of node) {
            if (char !== "word") {
                this._autocomplete(subNode, results);
            }
        }
        return results;
    }
}

const trie = new Trie();

(async () => {
    
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    await fetch("https://raw.githubusercontent.com/dominictarr/random-name/master/names.json", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.forEach(word => {
                trie.addWord(word);
            });
        })
        .catch(error => console.log('error', error));

    app.get('/', (req, res) => {
        const word = req.query.q.trim();
        if ( word != ""){
            const results = trie.autocomplete(upperCase(word))
            res.send(results)
        }else{
            res.send([])
        }
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

})();

function upperCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}
