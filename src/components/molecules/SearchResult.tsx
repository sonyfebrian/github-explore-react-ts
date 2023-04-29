import { useState, useEffect } from 'react';

import Input from '../atom/Input';
import Button from '../atom/Button';
import Loading from '../atom/Loading';

import { Profile } from '../../types/types';
import { url } from '../../services/api';

import UserProfile from '../organisms/Profile';


const SearchForm = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [isLoading, setLoading] = useState(false);
    const [result, setResult] = useState<Profile[]>([])

    const handleSearch = (e: any) => {
        e.preventDefault();
        setLoading(true)
        setSearchValue(e.target.search.value)

    }


    useEffect(() => {
        fetch(`${url}search/users?q=${searchValue}&per_page=5`)
            .then(res => res.json())
            .then(data => {
                setResult(data?.items)
                setLoading(false)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, [searchValue])





    return (
        <div data-testid="home-component">
            <div className='w-11/12 md:w-3/5 lg:w-1/2 xl:w-2/5 mx-auto mt-10 bg-white lg:p-10 md:p-10 p-5 rounded-lg shadow-md shadow-indigo-500/50'>
                <form className="w-full space-y-5 dark:text-gray-100" onSubmit={handleSearch}>
                    <label className="block">
                        <p className="text-gray-600 text-xs uppercase my-2 text-start" data-testid="title">
                            Github Username
                        </p>
                        <Input type="text" name="search" required placeholder="Enter username" className="mt-3 px-3 py-3 border-2 shadow-sm focus:outline-none border-blue-300 bg-transparent focus:bg-slate-100 placeholder-slate-600  block w-full rounded-md  " />
                    </label>
                    <Button type="submit" className="bg-gradient-to-r from-[#6069d3ef] to-[#67f6f3c9] py-3 text-white text-xl font-medium rounded-md mt-2 w-full">Search</Button>
                </form>
                {
                    searchValue ?
                        <p className='text-sm text-gray-600 text-start mt-2'>Showing users for '{searchValue}'</p>
                        : ''
                }
                {
                    isLoading ? <Loading /> :
                        result === undefined
                            ? <p className='text-gray-500'> No Data found</p>
                            : result?.map((person, i) => <UserProfile key={i} person={person}></UserProfile>)
                }
            </div>
        </div>
    );
};

export default SearchForm;