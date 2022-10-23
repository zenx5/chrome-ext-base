

class Matches{
    constructor(){
        this.matched = false
    }
    match(pattern, obj ){
        if( this.createRegExp(pattern).exec( document.location.href ) !== null ){
            this.matched = true
            return this.insertCSS( obj.css ).insertJS( obj.js )
        }
        return this
    }

    defaultMatch( obj ){
        if( this.matched ) return this
        return this.insertCSS( obj.css ).insertJS( obj.js )
    }

    insertCSS( css ){
        if( css ) css()
        return this
    }

    insertJS( js ){
        if( js ) js()
        return this
    }

    createRegExp(pattern){
        return new RegExp( pattern
            .replaceAll('.', '\.')
            .replaceAll('/', '\/')
            .replaceAll('*', '.'))
    }

}

export default new Matches()