interface OrganizationSchemaProps {
  data: object;
}

const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({ data }) => {
  return <script key='structured-data' type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
};

export default OrganizationSchema;
