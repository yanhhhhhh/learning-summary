import { onMounted, onUnmounted, ref } from "vue";

export default function useMouse() {
	const x = ref(0);
	const y = ref(0);
	const moveCallback = (e: MouseEvent) => {
		x.value = e.offsetX;
		y.value = e.offsetY;
	};
	onMounted(() => {
		window.addEventListener("mousemove", moveCallback);
	}),
		onUnmounted(() => {
			window.removeEventListener("mousemove", moveCallback);
		});
	return {
		x,
		y,
	};
}
