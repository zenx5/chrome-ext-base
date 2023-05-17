import ReactDOM from "react-dom"
import App from "../App"
import { HashRouter } from "react-router-dom"
import { ProviderStorage } from "../services/StorageService"

export default function renderViews(){
    return ReactDOM.render(
        <HashRouter>
            <ProviderStorage>
                <App />
            </ProviderStorage>
        </HashRouter>,
        document.getElementById('root')
    )
}