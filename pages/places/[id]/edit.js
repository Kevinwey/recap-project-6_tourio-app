import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Form from "../../../components/Form.js";
import { StyledLink } from "../../../components/StyledLink.js";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);

  async function editPlace(place) {
    try {
      const response = await fetch(id ? `/api/places/${id}` : null, {
        method: "PATCH",
        body: JSON.stringify(place),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        mutate(); // ??????
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}

// export default function EditPage() {
//   const router = useRouter();
//   const { isReady } = router;
//   const { id } = router.query;
//   const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);

//   async function sendRequest(url, { arg }) {
//     try {
//       const response = await fetch(url, {
//         method: "PATCH",
//         body: JSON.stringify(arg),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         await response.json();
//       } else {
//         throw new Error(`Error: ${response.status}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const { trigger, isMutating } = useSWRMutation(
//     id ? `/api/places/${id}` : null,
//     sendRequest
//   );

//   async function editPlace(place) {
//     await trigger(place);
//   }
// }
