import { Card, Row, Col } from 'antd';
import { DollarTwoTone, ContactsTwoTone, ProfileTwoTone } from "@ant-design/icons";
import "./Dashboard.css"

function Dashboard() {
    return (
        <>
            <div style={{ padding: '20px', backgroundColor: "#F9FBFD" }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card bordered={false} style={{ textAlign: 'center' }}>
                            <div className='Card--item__icon'>
                                <DollarTwoTone />
                            </div>
                            <div>
                                <h2 style={{ color: '#2db7f5' }}>2000$</h2>
                                <p>Tổng thu nhập</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} style={{ textAlign: 'center' }}>
                            <div className='Card--item__icon'>
                            <ProfileTwoTone />
                            </div>
                            <div>
                                <h2 style={{ color: '#2db7f5' }}>100</h2>
                                <p>Học viên đăng kí</p>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} style={{ textAlign: 'center' }}>
                            <div className='Card--item__icon'>
                                <ContactsTwoTone />
                            </div>
                            <div>
                                <h2 style={{ color: '#2db7f5' }}>+$1,500</h2>
                                <p>Số giảng viên</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>

                </Row>
            </div>
        </>
    )
}

export default Dashboard;