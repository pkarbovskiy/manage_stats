import React, { useEffect } from 'react';
import './App.css';
function tableCheckboxes(ids: string[]) {
    Array.prototype.slice.apply(document.querySelectorAll('.video tr')).forEach(val => {
        const id = val.dataset.href.split('/')[2];
        console.log(id);
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', id)
        input.addEventListener('click', (e) => {
            e.stopPropagation();
            if (ids.includes(id)) {
                ids = ids.splice(ids.indexOf(id), 1);
                return;
            }
            console.log(ids);
            ids.push(id);
        });
        val.childNodes[3].prepend(input);
    });
    return ids;
}
const App: React.FC = () => {
    let ids: string[] = [];
    useEffect(() => {

    });
    return (
        <>
            <div className="main">
                <button onClick={() => { tableCheckboxes(ids); }}>Edit</button>
            </div>
            <ul>
                {ids.map(id => {
                    console.log(id);
                    return (<li key={id}>{id}</li>);
                })}
            </ul>
        </>
    );
}

export default App;
