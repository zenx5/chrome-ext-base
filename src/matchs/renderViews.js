import ReactDOM from "react-dom"
import App from "../App"
import { HashRouter } from "react-router-dom"

export default function renderViews(){
    return ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById('root')
    )
}