interface CampusFilterProps {
  selected: string;
  onChange: (campus: string) => void;
}

export default function CampusFilter({
  selected,
  onChange,
}: CampusFilterProps) {

  const campuses = [
    "Todos os campi",
    "Recife",
    "Garanhuns",
  ];

  return (
    <div className="campus-filter">

      {campuses.map((campus) => (

        <button
          key={campus}
          className={
            selected === campus
              ? "campus-button selected"
              : "campus-button"
          }
          onClick={() => onChange(campus)}
        >
          {campus}
        </button>

      ))}

    </div>
  );
}