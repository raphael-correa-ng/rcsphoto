import LoadingText from "./LoadingText";

interface Props {
  title: string;
  subtitle: string | string[];
  withLoadingPlaceholders?: boolean;
}

function PageHeader(props: Props) {
  const { title, subtitle, withLoadingPlaceholders } = props;

  const subtitles = typeof subtitle === 'string' ? [subtitle] : subtitle;

  return <div className="page-header">
    <h2>
      { title }
      { withLoadingPlaceholders && !title && <LoadingText chars={25}/> }
    </h2>
    {
      subtitles && subtitles.map((sub, index) =>
        <small key={index}>
          { sub }
        </small>
      )
    }
    {
      withLoadingPlaceholders && !subtitles && <small><LoadingText chars={35}/></small>
    }
  </div>
}

export default PageHeader;