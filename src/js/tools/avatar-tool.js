import { AVATARS } from '../constants/avatar-constants';

export const getAvatar = () => {
    const avatarsCount = AVATARS.length;
    const index = Math.floor(Math.random() * avatarsCount);

    return AVATARS[index];
};
