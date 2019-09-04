import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
    const [ids, setIds] = useState([] as string[]);
    let runOnce = false;
    useEffect(() => {
            Array.prototype.slice.apply(document.querySelectorAll('.video tr')).forEach(val => {
                const id: string = val.dataset.href.split('/')[2];
                const input = document.createElement('input');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('value', id)
                input.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (ids.includes(id)) {
                        setIds(ids => ids.splice(ids.indexOf(id), 1));
                        return;
                    }
                    setIds(ids => [...ids, id]);
                });
                val.childNodes[3].prepend(input);
            });
    }, []);
    return (
        <>
            <div className="main">
                <button onClick={() => { void 0 }}>Apply</button>
            </div>
            <ul>
                {ids.map(id => {
                    return (<li key={id}>{id}</li>);
                })}
            </ul>
        </>
    );
}

export default App;
