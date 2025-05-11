import { useImmer } from "use-immer";
export default function Form() {
  const [person, updatePerson] = useImmer({
    name: "Niki de Saint Phalle",
    artwork: {
      title: "Blue Nana",
      city: "Hamburg",
      image: "https://i.imgur.com/Sd1AgUOm.jpg",
    },
  });

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    // setPerson({
    //   ...person,
    //   name: value,
    // });
    updatePerson((draft) => {
      draft.name = value;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    updatePerson((draft) => {
      if (name === "title" || name === "city" || name === "image") {
        draft.artwork[name] = value;
      }
    });
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <label>
          Name:
          <input value={person.name} onChange={handleChangeName} />
        </label>
      </div>
      <label>
        Title:
        <input
          name="title"
          value={person.artwork.title}
          onChange={handleChange}
        />
      </label>
      <label>
        City:
        <input
          name="city"
          value={person.artwork.city}
          onChange={handleChange}
        />
      </label>
      <label>
        Image:
        <input
          name="image"
          value={person.artwork.image}
          onChange={handleChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {" by "}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </form>
  );
}
