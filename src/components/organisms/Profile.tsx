import { useEffect, useState } from 'react';
import Repositories from './Repositories';

import { Profile, Repo } from '../../types/types';



const UserProfile = (props: { person: Profile }) => {
    const [result, setResult] = useState<Repo[]>([])


    console.log(result)

    useEffect(() => {
        fetch(`${props.person.repos_url}`)
            .then(res => res.json())
            .then(data => setResult(data))
    }, [props.person.repos_url])

    return (
        <div>
            <details className="w-full border rounded-lg my-2 bg-slate-100">
                <summary className="px-4 py-6">{props.person.login}</summary>
                {
                    result.length > 0 ?
                        result?.map((repository, i) => <Repositories key={i} repository={repository}></Repositories>)
                        : <p className='text-gray-500'> No repository found</p>
                }
            </details>
        </div>
    );
};

export default UserProfile;