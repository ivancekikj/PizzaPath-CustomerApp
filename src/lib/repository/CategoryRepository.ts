import ApiData from './ApiData';
import axios from 'axios';

const getAllCategories = async () => {
	const response = await axios.get(`${ApiData.get('ADMIN_APP_URL')}/api/menu/categories/`);
	return response.data;
};

export const CategoryRepository = {
	getAllCategories
};
