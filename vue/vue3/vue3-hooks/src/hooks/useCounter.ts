import { ref } from "vue";

export default function useCounter() {
	const number = ref(0);
	const add = () => {
		number.value++;
	};
	return {
		number,
		add,
	};
}
