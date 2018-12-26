export const Users = [
	{
		id : 1,
		name : 'Chetali'
	},
	{
		id : 2,
		name : 'Jaslok Hospital'
	},
	{
		id : 3,
		name : 'Fortis Hospital'
	},
	{
		id : 4,
		name : 'Aetna Insurance'
	},
	{
		id : 5,
		name : 'St. Joseph Hospital'
	},
	{
		id : 6,
		name : 'Bajaj Alliance Insurance'
	},
	{
		id : 7,
		name : 'Upstate Medical University'
	},

];

export const LoggedInUser = {
	id : 1,
	name : 'Chetali',
	grantList : [2, 3, 5, 7],
	mapPermission : [{ 2 : 0}, {3 : 1}, {5 : 1}, {7 : 0}]
};