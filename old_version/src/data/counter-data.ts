

interface counterDataType  {
    id: number;
    count: number;
    symbol: string;
    title: string;
 
}

const counter_data: counterDataType[] = [
	{
		id: 1,
		count: 200,
    symbol: "k+",
		title: "Clients Satisfactions",
	},
	{
		id: 2,
		count: 150,
    symbol: "k+",
		title: "Project Complete",
	}, 
	{
		id: 3,
		count: 1000,
    symbol: "+",
		title: "Success Rating",
	},
	{
		id: 4,
		count: 850,
    symbol: "+",
		title: "Tailored Strategies",
	},
];

export default counter_data;