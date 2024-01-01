import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import Dropdown from '#components/Dropdown';
import { getLocalUserByFirstName } from '../../Utils/LocalUser';
import { UserInterface } from '#interfaces/UserInterface';

import './index.css';

const Topbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState<UserInterface[]>([]);;
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onOptionClicked = useCallback((option: UserInterface) => () => {
        setIsOpen(false);
        navigate(`/user/${option.id}`);
    }, [navigate]);

    useEffect(() => {
        if (searchTerm !== '') {
            setIsLoading(true);
            fetch(`https://dummyjson.com/users/search?q=${searchTerm}&limit=5`)
                .then(response => response.json())
                .then(data => {
                    const localUser = getLocalUserByFirstName(searchTerm);
                    setOptions(localUser ? [...data.users, localUser] : data.users);
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        }
    }, [searchTerm]);

    const filteredOptions = options;
    return (
        <>
            <div className="topbar">
                <div className="topbar-wrapper">
                    <div className="topbar-left">
                        <div className="search-dropdown">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleInputChange}
                                onFocus={() => setIsOpen(true)}
                                onBlur={() => setIsOpen(false)}
                            />

                            {isOpen && (
                                <div className="search-dropdown__list" onMouseDown={e => e.preventDefault()}>
                                    {isLoading ? (
                                        <div className="search-dropdown__option">Searching...</div>
                                    ) : filteredOptions.length > 0 ? (
                                        filteredOptions.map((option) => (
                                            <div key={option.id} className="search-dropdown__option" onClick={onOptionClicked(option)}>
                                                {option.firstName + ' ' + option.lastName}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="search-dropdown__option">No user found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="topbar-right">
                        <div className="topbar-icons">
                            <img  width="20" height="20" src="https://img.icons8.com/pastel-glyph/64/appointment-reminders.png" alt="appointment-reminders"/>
                            <img  width="20" height="20" src="https://img.icons8.com/external-royyan-wijaya-detailed-outline-royyan-wijaya/24/external-chats-communication-royyan-wijaya-detailed-outline-royyan-wijaya.png" alt="external-chats-communication-royyan-wijaya-detailed-outline-royyan-wijaya"/>
                            <div className="login">
                                <img
                                    width="30"
                                    height="30"
                                    src="https://img.icons8.com/windows/32/admin-settings-male.png"
                                    alt="admin-settings-male"/>
                                <Dropdown/>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </>
    );
}

export default Topbar;