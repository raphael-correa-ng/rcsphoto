import LoadingText from "./LoadingText";

interface Props {
  title: string;
  subtitle: string | string[];
}

function PageHeader(props: Props) {
  const { title, subtitle } = props;

  const subtitles = typeof subtitle === 'string' ? [subtitle] : subtitle;

  return <div className="page-header">
    <h2>
      { title }
      { !title && <LoadingText chars={25}/> }
    </h2>
    {
      subtitles && subtitles.map((sub, index) =>
        <small key={index}>
          { sub }
        </small>
      )
    }
    {
      !subtitles && <small><LoadingText chars={35}/></small>
    }
  </div>
}

export default PageHeader;