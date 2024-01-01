import { UserInterface } from "#interfaces/UserInterface";

const getAllLocalUsers = (): UserInterface[] => {
    return JSON.parse(localStorage.getItem('users') || '[]');
};

const setUsersToLocalStorage = (users: UserInterface[]): void => {
    localStorage.setItem('users', JSON.stringify(users));
};

const getLocalUsersMaxId = (): number => {
    const users = getAllLocalUsers();
    const maxId = users.length <= 0 ? 100 : Math.max(...users.map(user => user.id));
    return maxId < 100 ? 101 : maxId + 1;
};

const getLocalUserById = (id: number): UserInterface | null => {
    const users = getAllLocalUsers();
    const user = users.find(user => user.id === id);
    return user || null;
};

const getLocalUserByFirstName = (firstName: string): UserInterface | null => {
    const users = getAllLocalUsers();
    const user = users.find(user => user.firstName.toLowerCase().includes(firstName.toLowerCase()));
    return user || null;
};


const addLocalUser = (newUser: UserInterface): void => {
    const users = getAllLocalUsers();
    newUser.id = newUser.id === 101 ? getLocalUsersMaxId() : newUser.id;
    users.push(newUser);
    setUsersToLocalStorage(users);
};


const editLocalUser = (updatedUser: UserInterface): boolean => {
    const users = getAllLocalUsers();
    const userIndex = users.findIndex(user => user.id === updatedUser.id);
    // User not found.
    if (userIndex === -1) {
        return false;
    }

    users[userIndex] = updatedUser;
    setUsersToLocalStorage(users);
    return true;
};

const deleteLocalUser = (id: number): boolean => {
    const users = getAllLocalUsers();
    const updatedUsers = users.filter(user => user.id !== id);
    if (users.length === updatedUsers.length) {
        return false;
    }
    setUsersToLocalStorage(updatedUsers);
    return true;
};

export { getLocalUsersMaxId, getAllLocalUsers, addLocalUser, deleteLocalUser, getLocalUserById, editLocalUser, getLocalUserByFirstName };
