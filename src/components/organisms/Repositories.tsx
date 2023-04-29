import { Repo } from '../../types/types';

const Repositories = (props: { repository: Repo }) => {
    return (
        <div className='border bg-white text-start p-4'>
            <p className='text-xl text-[#6069d3ef] font-semibold '>{props.repository.name}</p>
            {
                props.repository.description ?
                    <p>{props.repository.description}</p>
                    : <p className='text-gray-500'>No description found</p>
            }


        </div>
    );
};

export default Repositories;