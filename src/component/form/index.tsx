import React, { FunctionComponent } from 'react';
import { Form, Button, Row } from 'antd';
interface monitorForm {
    url: string
    id : string
}

const Main:FunctionComponent<monitorForm> = (formValues) => {
    const formUrl = formValues.url
    return(
        <div>
        <p> MÁY BƠM NƯỚC SỐ {formValues.id}</p>
        <Form>
            <img
                src = {formUrl}
                width = "200"
                height = "150"
            />
        </Form>
        <Button 
                type="primary" 
                htmlType="button"
                >
                Bật Máy bơm
        </Button>
    </div>
    )
};

export default Main;