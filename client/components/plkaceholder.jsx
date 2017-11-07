<div className="col-md-12">
  <div className="table-responsive">
    <div className="tim-typo">
      <h3 className="tim-note"> Review Item
            </h3>
      <br />
      <div className="media-body">
        <Rating maxRating={5} defaultRating={0} icon="star" size="large" onChange={this.handleRatingChange} />
        <div className="form-group">
          <textarea className="form-control" name="review" onChange={this.handleTextChange} placeholder="Leave a review" rows="6" />

        </div>
      </div>
      <div className="media-footer">
        <button onClick={() => handleSubmit(userId, albumId, this.state, this)} className="btn btn-primary btn-wd pull-right">Submit Review</button>
      </div>
    </div>
  </div>
</div>

<Segment inverted>
<Form inverted onClick={() => handleSubmit(userId, albumId, this.state, this)} label = 'Review Item' >
  <Form.Group widths='equal'>
    <Form.Rating  name ='rating' maxRating={5} defaultRating={0} icon="star" size="large" onChange={this.handleRatingChange} />
    <Form.TextArea name ='text' placeholder='Leave a review' onChange={this.handleTextChange} />
  </Form.Group>
  <Form.Checkbox label='I agree to the Terms and Conditions' />
  <Button type='submit'>Submit Review</Button>
</Form>
</Segment>
