import Swal from "sweetalert2";

export async function back() {
  const { value: amount } = await Swal.fire({
    title: "How much DAI would You like to contribute?",
    icon: "question",
    input: "range",
    inputAttributes: {
      min: 1,
      max: 120,
      step: 1
    },
    inputValue: 25
  });
  console.log(amount);
}
