class editor {

    constructor(id) {
        this.id = id ? id : 'editor';
        this.element = document.getElementById(this.id);
    }

    buildtextarea () {
        var textarea = document.createElement("textarea");
        textarea.id = "editor";
        this.editor = textarea;
    }

    init (value) {
        this.buildtextarea()
        this.element.appendChild(this.editor);
        if (value) {
            this.editor.value = value
        }
    }

    onChange(func) {
        this.editor.addEventListener('input', func, false);
    }

    getArrayfiedValues () {
        var value = this.editor.value;
        var arrayValues = value.split('\n');
        return arrayValues
    }

    toText (array) {
        var text = array.join('\n')
        return text;
    }
}

var textarray = ["salut", 'a' , "", "tous"];

var edit = new editor("content");
edit.init(edit.toText(textarray));
edit.onChange((e) => {
    console.log(edit.getArrayfiedValues())
})






// function getContent() {
//     var content = editor.value;    
//     return content

// }

// function changeHandle () {
    
//     var text = getContent();
//     text = text.split('\n')

//     console.log(text)
// }