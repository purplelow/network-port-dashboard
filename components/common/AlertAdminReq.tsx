import Swal from "sweetalert2";

export default function AlertAdminReq() {
  Swal.fire({
    title: "관리자 암호를 입력하세요.",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    showCancelButton: true,
    confirmButtonText: "재부팅",
    showLoaderOnConfirm: true,
    cancelButtonText: "취소",
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          Swal.showValidationMessage(`Request failed: ${error}`);
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url,
      });
    }
  });
}
