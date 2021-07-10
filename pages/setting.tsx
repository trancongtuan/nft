import React, { FC, useRef, useState } from 'react'
import { Box, Text, Flex, Image, Button } from 'theme-ui'

import * as ethUtil from 'ethereumjs-util'
import * as sigUtil from 'eth-sig-util'
import { fetchUsers, updateUser, createUser } from '../queries';

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import CustomInput from '../components/CustomInput'
import LockIcon from '../public/assets/images/icons/lock.svg'
import { useEffect } from 'react';

const chainId = 'RINKEBY' === 'RINKEBY' ? 4 : 1;

const Setting: FC = () => {
    const inputFile = useRef(null)
    const [reLink, setReLink] = useState(false)
    const [profile, setProfile] = useState({
        id: null,
        display_name: '',
        custom_url: '',
        twitter: '',
        email: '',
        bio: '',
        website: '',
    })

    const handleOnClick = (): void => {
        inputFile.current.click()
    }

    const updateOrCreateUser = async (data) => {
        try {
            var from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')
            
            if (data.id) {
                await updateUser(data.id, data)
            } else {
                await createUser({ ...data, address: from })
            }
        } catch(e) {
            alert(e.toString())
        }
    }

    const onSign = async (data) => {
        try {
            const msgParams = JSON.stringify({
                domain: {
                    chainId,
                    name: 'ULTCube Profile',
                    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                    version: '1',
                },
                message: {
                    ...data,
                    contents: 'Profile update',
                    from: {
                        name: 'Cow',
                        wallets: [
                            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                        ],
                    },
                    to: [
                        {
                            name: 'Bob',
                            wallets: [
                                '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                                
                            ],
                        },
                    ],
                },
                primaryType: 'Mail',
                types: {
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    Group: [
                        { name: 'name', type: 'string' },
                        { name: 'members', type: 'Person[]' },
                    ],
                    Mail: [
                        { name: 'from', type: 'Person' },
                        { name: 'to', type: 'Person[]' },
                        { name: 'contents', type: 'string' },
                    ],
                    Person: [
                        { name: 'name', type: 'string' },
                        { name: 'wallets', type: 'address[]' },
                    ],
                },
            })

            var from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')

            var params = [from, msgParams];
            var method = 'eth_signTypedData_v4';

            web3.currentProvider.sendAsync(
                {
                    method,
                    params,
                    from,
                },
                function (err, result) {
                    if (err) return console.dir(err);
                    if (result.error) {
                        alert(result.error.message);
                    }
                    if (result.error) return console.error('ERROR', result);
                    console.log('TYPED SIGNED:' + JSON.stringify(result.result));
                    console.log('sigUtil', sigUtil);

                    const recovered = sigUtil.recoverTypedSignature_v4({
                        data: JSON.parse(msgParams),
                        sig: result.result,
                    });

                    if (
                        ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)
                    ) {
                        updateOrCreateUser(data);
                    } else {
                        alert(
                            'Failed to verify signer when comparing ' + result + ' to ' + from
                        );
                    }
                }
            );
        } catch (e) {
            alert(e.toString());
        }
    }

    const updateProfile = async () => {
        try {
            var from = (await window.ethereum.enable())[0]
            if (!from) throw new Error('No account selected.')
            const result = await fetchUsers(from)
            console.log(from, result)
            if (result[0]) {
                setProfile(result[0]);
            }
        } catch(e) {
            alert(e.toString());
        }
    }

    useEffect(() => {
        updateProfile();
    }, [])

    return (
        <Box>
            <NavigationBar />
            <Box
                py={4}
                px={[16, 18, 24, 24]}
                sx={{ width: '100%', margin: '0px auto', maxWidth: '815px' }}
            >
                <Box mx={10}>
                    <Text
                        sx={{
                            display: 'block',
                            fontSize: [24, 24, 32, 36],
                            fontWeight: 'bold',
                            color: 'text',
                        }}
                    >
                        Edit profile
                    </Text>
                    <Text
                        mt={24}
                        sx={{
                            display: 'block',
                            fontSize: [20, 22, 22, 22],
                            color: 'textSecondary',
                            lineHeight: 1.4,
                            fontWeight: 'body',
                        }}
                    >
                        You can set preferred display name, create your branded
                        profile URL and manage other personal settings
                    </Text>
                </Box>
                <Flex
                    mt={40}
                    mx={10}
                    sx={{
                        flexDirection: [
                            'column-reverse',
                            'column-reverse',
                            'column-reverse',
                            'row',
                        ],
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            '>div': {
                                marginTop: 45,
                                ':first-child': {
                                    margin: 0,
                                },
                            },
                        }}
                        mr={[0, 0, 0, 40]}
                    >
                        <CustomInput
                            label="Display name"
                            value={profile.display_name}
                            placeholder="Enter your display name"
                            onChange={v => setProfile(ori => ({ ...ori, display_name: v }))}
                        />
                        <CustomInput
                            label="Custom URL"
                            value={profile.custom_url}
                            staticLeft={
                                <Text
                                    mr={2}
                                    sx={{
                                        fontSize: '15px',
                                        fontWeight: 'semiBold',
                                        marginTop: '-2px',
                                        minWidth: 'max-content',
                                    }}
                                >
                                    rarible.com/
                                </Text>
                            }
                            placeholder="Enter your custom url"
                            onChange={v => setProfile(ori => ({ ...ori, custom_url: v }))}
                        />
                        <CustomInput
                            label="Bio"
                            value={profile.bio}
                            placeholder="Tell about yourself in a few words"
                            onChange={v => setProfile(ori => ({ ...ori, bio: v }))}
                        />
                        <CustomInput
                            label="Twitter username"
                            subLabel="Link your Twitter account to gain more trust on the marketplace"
                            value={profile.twitter}
                            placeholder="@"
                            staticRight={
                                <Box
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'primary',
                                        fontSize: 1,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setReLink(!reLink)}
                                >
                                    {reLink ? (
                                        <Flex sx={{ width: 'max-content' }}>
                                            <Text mr={8}>Check</Text>
                                            <Text ml={8}>Tweet again</Text>
                                        </Flex>
                                    ) : (
                                        <Text>Link</Text>
                                    )}
                                </Box>
                            }
                            onChange={v => setProfile(ori => ({ ...ori, twitter: v }))}
                        />
                        <CustomInput
                            label="Personal site or portfolio"
                            value={profile.website}
                            placeholder="https://"
                            onChange={v => setProfile(ori => ({ ...ori, website: v }))}
                        />
                        <CustomInput
                            label="Email"
                            subLabel="Your email for marketplace notifications"
                            value={profile.email}
                            Icon={<LockIcon />}
                            placeholder="Enter your email"
                            staticBottom={
                                <Box
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'textSecondary',
                                    }}
                                >
                                    <Text>
                                        You must sign message to view or manage
                                        your email.
                                    </Text>{' '}
                                    <Text
                                        sx={{
                                            color: 'primary',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Sign message
                                    </Text>
                                </Box>
                            }
                            onChange={v => setProfile(ori => ({ ...ori, email: v }))}
                        />
                        {/* <Flex>
                            <Box>
                                <Text variant="heading">Verification</Text>
                                <Text
                                    mt="4px"
                                    sx={{
                                        display: 'block',
                                        color: 'textSecondary',
                                        fontSize: '13px',
                                        fontWeight: 'semiBold',
                                    }}
                                >
                                    Procceed with verification proccess to get
                                    more visibility and gain trust on Rarible
                                    Marketplace. Please allow up to several
                                    weeks for the process.
                                </Text>
                            </Box>
                            <Box sx={{ minWidth: '120px' }} mt="4px" ml="10px">
                                <Button
                                    variant="secondary"
                                    sx={{ fontSize: '12px' }}
                                >
                                    Get verified
                                </Button>
                            </Box>
                        </Flex> */}
                        <Button
                            variant="primary"
                            mt={40}
                            sx={{ fontSize: '12px', width: '100%' }}
                            onClick={() => onSign(profile)}
                        >
                            Update profile
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            minWidth: ['100%', '100%', '100%', '220px'],
                            height: [
                                'max-content',
                                'max-content',
                                'max-content',
                                '915px',
                            ],
                            marginBottom: [32, 32, 32, 0],
                        }}
                    >
                        <Box
                            sx={{
                                display: ['flex', 'flex', 'flex', 'block'],
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'sticky',
                                top: 90,
                                bottom: '0px',
                                right: 0,
                            }}
                        >
                            <Image
                                src="https://picsum.photos/200/300"
                                sx={{
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                    width: '100px',
                                    height: '100px',
                                }}
                            />
                            <Text
                                my={16}
                                sx={{
                                    display: 'block',
                                    color: 'textSecondary',
                                    fontSize: '13px',
                                    fontWeight: 'semiBold',
                                    maxWidth: '200px',
                                }}
                            >
                                We recommend an image of at least 400x400. Gift
                                work too.
                            </Text>
                            <Button
                                variant="secondary"
                                sx={{ fontSize: '12px' }}
                                onClick={handleOnClick}
                            >
                                <input
                                    type="file"
                                    id="file"
                                    ref={inputFile}
                                    style={{ display: 'none' }}
                                />
                                Choose file
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Footer />
        </Box>
    )
}

export default Setting
