import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useGetCommentbyIdQuery } from "api/data/comment";
import LoadingCircle from "components/common/LoadingCircle";
import { useParams } from "react-router-dom";

function Comment() {
  const params = useParams();
  const { data, isLoading } = useGetCommentbyIdQuery(params);

  return (
    <div>
      <LoadingCircle isLoading={isLoading} />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Comment:-
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data?.content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Comment;
