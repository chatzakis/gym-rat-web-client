import { React } from "react";

function EntryFormRow({name, image, children }) {
    let imageUrl = image || name;
    imageUrl = "icons/" + imageUrl + ".png";

    function formatName(name){
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    return (
        <>
            <div className="mb-3">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <img alt={name} src={imageUrl}></img>
                    </div>
                    <div className="col-auto">
                        <label htmlFor={name} className="form-label m-0">{formatName(name)}</label>
                    </div>
                    <div className="col-auto input-col">
                        { children }
                    </div>
                </div>
            </div>
        </>
    );
}

export default EntryFormRow;